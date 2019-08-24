import React from 'react';



export function Test(){
    const values = [{key:1,productValue:"1번", productName:"바나나"}, {key:2,productValue:"2번", productName:"사과"}, {key:3,productValue:"3번", productName:"포도"}];
    return (
        <div>
            <h1>결제성공!</h1>
            <select>
                {values.map((item)=>{
                    return (
                    <option value={item.productValue} key={item.key}>{item.productName}</option>
                    )
                })}
            </select>
        </div>
    );
}