import { useLocalSearchParams , Stack} from "expo-router";
import { Text, View , Image, Pressable } from "react-native";
import dayjs from "dayjs"
import events from '~/assets/event.json'



export default function EventPage(){
    const  {id } = useLocalSearchParams();

    const  event =events.find((e)=>e.id == id);

    if(!event){
        return <Text>Etkinlik Bulunamadi</Text>
    }
    return (
        <View className="flex-1 p-3 bg-white gap-3">
            <Stack.Screen options={{title :'Etkinlik Detayi' , headerBackTitleVisible: false , headerTintColor:'black'}}/>
            <Image source={{uri:event.image}} className='w-full aspect-video rounded-xl'/>
            <Text className='text-3xl font-bold' >{event.title}</Text>
            <Text className='text-lg font semi-bold uppercase text-amber-800'>
            {dayjs(event.datetime).format('ddd,D MMM')} . {dayjs(event.datetime).format('hh:mm A')} 
            </Text>
            <Text className='text-lg' >
                {event.description}
            </Text>

            {/* Footer */}

            <View className="absolute bottom-0 left-0  right-0 flex-row justify-between border-t-2 border-gray-400 p-5 pb-10 items-center">
            <Text className="text-xl font-semibold">Free</Text>
                
                <Pressable className="bg-red-500 p-5 px-8 rounded-md">
                    <Text className="text-lg font-bold text-white">Join and Rsvp</Text>
                </Pressable>
            </View>
        </View>
    )
}