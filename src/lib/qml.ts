/** Ideal textbook one-qubit model and elementary kernel; no hardware inference. */
export const prediction=(z:number,theta:number)=>Math.cos(z+theta);
export const squaredLoss=(z:number,theta:number,target:number,lambda=0)=>{if(lambda<0)throw Error('Regularization must be nonnegative');return (prediction(z,theta)-target)**2+lambda*theta*theta};
export const parameterShift=(z:number,theta:number)=>(prediction(z,theta+Math.PI/2)-prediction(z,theta-Math.PI/2))/2;
export const lossGradient=(z:number,theta:number,target:number,lambda=0)=>2*(prediction(z,theta)-target)*parameterShift(z,theta)+2*lambda*theta;
export const ryKernel=(z:number,zPrime:number)=>Math.cos((z-zPrime)/2)**2;
export const shotStandardErrorBound=(shots:number)=>{if(!Number.isInteger(shots)||shots<1)throw Error('Positive integer shots required');return 1/Math.sqrt(shots)};
