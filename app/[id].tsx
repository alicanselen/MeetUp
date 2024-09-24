import { useLocalSearchParams , Stack} from "expo-router";
import { Text, View , Image } from "react-native";
import dayjs from "dayjs"
import events from '~/assets/event.json'



export default function EventPage(){
    const  {id } = useLocalSearchParams();

    const  event =events.find((e)=>e.id == id);

    if(!event){
        return <Text>Etkinlik Bulunamadi</Text>
    }
    return (
        <View className="p-3 bg-white gap-3">
            <Stack.Screen options={{title :'Etkinlik Detayi' , headerBackTitleVisible: false , headerTintColor:'black'}}/>
            <Image source={{uri:event.image}} className='w-full aspect-video rounded-xl'/>
            <Text className='text-3xl font-bold' >{event.title}</Text>
            <Text className='text-lg font semi-bold uppercase text-amber-800'>
            {dayjs(event.datetime).format('ddd,D MMM')} . {dayjs(event.datetime).format('hh:mm A')} 
            </Text>
            <Text className='text-lg' >
                {event.description}
            </Text>
        </View>
    )
}