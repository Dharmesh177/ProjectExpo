import React from "react";
import bvm_logo from '../../Assets/Images/BVM_logo.png'
export default function SubCard(props) {
    return (
        <>
            <div style={{width: '17vw', 
                        
                        textAlign: 'center', 
                        boxShadow: "0px 0px 8px 1px #B5B5B5",
                        marginLeft: 20,
                        marginTop: 30,
                        padding: 15,
                        borderRadius: 15,
                        fontFamily: 'poppins',
                        flexWrap: 'wrap'}}>
                <img src="https://bigeye.ug/wp-content/uploads/2016/05/Couple-travel.jpg" width="50vw" height="50vh"/>
                <div style={{textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 10}}>
                    {props.title}
                </div>
                <div style={{fontWeight: 'bold',
                textAlign: 'left',
                marginTop: 15}}>
            Eligibility:
        </div>
                <div style={{textAlign: 'left', 
                            marginTop: 10,
                          
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            fontFamily: 'poppins',
                            fontSize: 14}}>
                    {props.information}
                </div>
                <div style={{fontWeight: 'bold',
                textAlign: 'left',
                marginTop: 15}}>
           Objective:
        </div>
                <div style={{textAlign: 'left', 
                            marginTop: 10,
                           
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            fontFamily: 'poppins',
                            fontSize: 14}}>
                    {props.obj}
                </div>

                <div style={{background: '#D5E3FE',
                                borderRadius: 20,
                                color: '#2C5EFF',
                                fontWeight: 600,
                                marginTop: 15,
                                width: 'fit-content',
                                paddingLeft: 10,
                              margin:"auto",
                                paddingRight: 10,
                                padding:'11px',
                                cursor:'pointer',
                                }}>
                        {props.SubCardType}
                    </div>

            </div>
        </>
    )
}