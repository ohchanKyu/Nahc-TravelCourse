import React from "react";
import PlaceItemCard from "./PlaceItemCard";
import Carousel from 'react-bootstrap/Carousel';
import classes from "./PlaceItemCarousel.module.css";

const PlaceItemCarousel = (props) => {

   const placeItemList = props.item;
   const carouselList = [];
   for(var i=0;i<placeItemList.length;i+=3){
      let arrayList = [];
      for (var j=i;j<i+3 && j < placeItemList.length;j++){
        arrayList.push(placeItemList[j]);
      }
      carouselList.push(arrayList);
      arrayList = [];
   }

    return (
        <Carousel>
            {placeItemList && carouselList.map(items => 
                {
                    return(
                        <Carousel.Item>
                            <div className={classes.card_list}>
                                {items.map(element => {
                                    return <PlaceItemCard key={element.locationX} item={element}/>
                                })}
                            </div>
                        </Carousel.Item>
                    ) 
                    
                })
            }
        </Carousel>
    );
};

export default PlaceItemCarousel;
