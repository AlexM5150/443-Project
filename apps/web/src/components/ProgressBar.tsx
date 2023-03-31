import React from "react";

export default function ProgressBar(props: {completed: number}){
    const completed = props;
    let color = 'blue'
    if (completed.completed < 25){
        color = 'green'
    }
    else if (completed.completed > 85){
        color = 'red'
    }
    // container styles sheet
    const container= {
        height: 25,
        width: '90%',
        backgroundColor: 'gray',
        borderRadius: 50,
        margin: 50
    }
    // percentage style sheet
    const percentFilled: any = {
        height: '100%',
        width: `${completed.completed}%`,
        backgroundColor: `${color}`,
        borderRadius: 'inherit',
        textAlign: 'center',
        
    }
    // percentage lable style sheet
    const label = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
        
    }
    return(
        <div style={container}>
            <div style={percentFilled}>
                <span style={label}>{`${completed.completed}%`}</span>
            </div>
        </div>
    )

}