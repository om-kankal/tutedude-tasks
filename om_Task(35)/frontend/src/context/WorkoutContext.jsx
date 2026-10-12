import {
  createContext,
  useContext,
  useEffect,
  useReducer
} from "react";

const WorkoutContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const initialState = {
  workouts: [],
  loading: true,
  error: null
};

function workoutReducer(state, action) {
  switch (action.type) {
    case "LOAD_WORKOUTS":
      return {
        ...state,
        workouts: action.payload,
        loading: false,
        error: null
      };

    case "ADD_WORKOUT":
      return {
        ...state,
        workouts: [action.payload, ...state.workouts],
        error: null
      };

    case "REMOVE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload
        ),
        error: null
      };

    case "LOADING":
      return {
        ...state,
        loading: action.payload
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export function WorkoutProvider({ children }) {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  const loadWorkouts = async () => {
    try {
      dispatch({ type: "LOADING", payload: true });

      const response = await fetch(`${API_URL}/workouts`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch workouts");
      }

      dispatch({
        type: "LOAD_WORKOUTS",
        payload: data
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "Could not connect to the server"
      });
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  const addWorkout = async (workoutData) => {
    try {
      const response = await fetch(`${API_URL}/workouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(workoutData)
      });

      const data = await response.json();

      if (!response.ok) {
        const details = data.errors ? ` ${data.errors.join(" ")}` : "";
        throw new Error((data.message || "Could not add workout") + details);
      }

      dispatch({
        type: "ADD_WORKOUT",
        payload: data
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message
      });

      return {
        success: false,
        message: error.message
      };
    }
  };

  const removeWorkout = async (id) => {
    try {
      const response = await fetch(`${API_URL}/workouts/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete workout");
      }

      dispatch({
        type: "REMOVE_WORKOUT",
        payload: id
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message
      });

      return {
        success: false,
        message: error.message
      };
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        ...state,
        addWorkout,
        removeWorkout,
        loadWorkouts
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  return useContext(WorkoutContext);
}
