import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemState,
    AccordionItemPanel
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import {MdOutlineArrowDropDown} from 'react-icons/md'
import './Value.css'
import data from '../utils/accordion'
import { useState } from 'react'
export default function Value(){
    const[className,setClassName]=useState(null)
    console.log(className);
    return(
        <section id='Values' className='v-wrapper'>
            <div className="paddings innerWidth flexCenter v-container">
                <div className="v-left">
                    <div className="image-container">
                        <img src='./value.jpg' alt=""/>
                    </div>
                </div>
                <div className="flexColStart v-right">
                    <span className='orangeText'>Our Value</span>
                    <span className='primaryText'>What we give to you</span>
                    <span className='mb-4 secondaryText'>
                        We are always ready to help by providing the best services for you
                        <br />
                        We belive a good place to live makes your life better 
                    </span>
                    <Accordion
                    className='accordion-contianer'
                    allowMultipleExpanded={false}
                    preExpanded={[0]}
                    >
                    {
                        data.map((item,i)=>{
                            return(
                                <AccordionItem className={`accordionItem ${className}`} key={i} uuid={i}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton className='flexCenter accordionButton'>
                                            <AccordionItemState>
                                                {({expanded})=> !expanded ? setClassName('expanded'): setClassName('collapsed')}
                                                </AccordionItemState>
                                            <div className="flexCenter icon">{item.icon}</div>
                                            <span className="primaryText">
                                                {item.heading}
                                            </span>
                                            <div className="flexCenter icon">
                                                <MdOutlineArrowDropDown size={20}/>
                                            </div>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p className="secondaryText">{item.detail}</p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            )
                        })
                    }
                    </Accordion>
                </div>
            </div>
        </section>
    )
}