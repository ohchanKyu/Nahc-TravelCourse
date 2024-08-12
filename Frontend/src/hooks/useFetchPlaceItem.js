import useAuthFunction from "./useAuthFunction";
import { getPlaceImage } from "../api/LocationApiService";
import { getCarRoute, getRoadRoute } from "../api/RouteApiService";

const useFetchPlaceItem = () => {

    const functionHandler = useAuthFunction();

    const fetchPlaceItemHandler = async ({ placeDatas, originX, originY }) => {
        const fetchDatas = await Promise.all(placeDatas.map(async element => {
            const fileName = element.placeImage;

            const imageFileResponseData = await functionHandler(getPlaceImage,{
                fileName
            });

            const imageURL = URL.createObjectURL(imageFileResponseData);

            const locationData = {
              originX,
              originY,
              destinationX: element.locationX,
              destinationY: element.locationY
            }

            const carRouteResponseData = await functionHandler(getCarRoute,{
                location : locationData,
            })

            const roadRouteResponseData = await functionHandler(getRoadRoute,{
                location : locationData,
            })

            const newElement = {
              ...element,
              image : imageURL,
              duration: carRouteResponseData.duration,
              taxiFare: carRouteResponseData.taxiFare,
              roadTotalTime : roadRouteResponseData.totalTime
            };
            return newElement;
        }));
        return fetchDatas;
    };

    return fetchPlaceItemHandler;
};

export default useFetchPlaceItem;