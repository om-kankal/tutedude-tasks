let dummyArray=[4,8,2,11,6,7,10];
let out=document.getElementById("output");
function print(msg){
console.log(msg);
out.innerHTML+=msg+"<br>";
}
print("Ex Array:- ["+dummyArray.join(", ")+"]");
const findMax=(arr)=>{
let max=arr[0];
for(let i=1;i<arr.length;i++){
if(arr[i]>max){
max=arr[i];
}
}
return max;
};
const calculateSum=function(arr){
let sum=0;
for(let i=0;i<arr.length;i++){
sum+=arr[i];
}
return sum;
};
function countOdd(arr){
let count=0;
for(let i=0;i<arr.length;i++){
if(arr[i]%2!==0){
count++;
}
}
return count;
}
print("Maximum number: "+findMax(dummyArray));
print("Sum of all elements: "+calculateSum(dummyArray));
print("Count of odd numbers: "+countOdd(dummyArray));