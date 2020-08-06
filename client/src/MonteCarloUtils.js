function wts(colors) {

const total=colors.reduce((a,b)=> a+b,0)
return (colors.map((color,index)=>{
  return colors.slice(0,index+1).reduce((a,b)=>a+b,0)/total

  }))
}

export function randomColor(colors){
	const colorsList=Object.values(colors)
	const weights=wts(colorsList)
	
	const r=Math.random()
	
	const index=weights.findIndex(x=>(x>r))
	
	return Object.keys(colors)[index]

}