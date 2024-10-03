import { useLocalSearchParams , Stack , Link} from "expo-router";
import { Text, View , Image, Pressable, ActivityIndicator } from "react-native";
import dayjs from "dayjs"
import { supabase } from "~/utils/supabase";
import { useEffect, useState } from "react";
import { useAuth } from "~/contexts/AuthProvider";
import { Attendance, Event } from "~/types/db";
import SupaImage from "~/components/SupaImage";



export default function EventPage(){
    const  {id } = useLocalSearchParams();
    const [event , setEvent] = useState<Event | null>(null);
    const [attendance , setAttendance] = useState<Attendance | null>(null);
    const [loading , setLoading] = useState(false);
    const {user} = useAuth();

    useEffect(()=> {
        fetchEvent();
    },[id]);

    const fetchEvent = async ()=> {
        setLoading(true);
        const {data, error} = await supabase.from('events').select('*').eq('id' , id).single();
        setEvent(data);

        const { data : attendanceData} = await supabase
        .from('attendance')
        .select('*')
        .eq('user_id' , user.id )
        .eq('event_id' , id)
        .single();

        setAttendance(attendanceData);
        setLoading(false);
    };
    const joinEvent=async ()=>{

        const{data , error} = await supabase
        .from('attendance')
        .insert({user_id:user.id,event_id:event.id})
        .select()
        .single();
        
        setAttendance(data);
    }

    if(loading){
        return <ActivityIndicator/> ;
    }

    if(!event){
        return <Text>Etkinlik Bulunamadi</Text>
    }
    return (
        <View className="flex-1 p-3 bg-white gap-3">
            <Stack.Screen options={{title :'Etkinlik Detayi' , headerBackTitleVisible: false , headerTintColor:'black'}}/>
            
            <SupaImage path ={event.image_uri} className='w-full aspect-video rounded-xl'/>

            <Text className='text-3xl font-bold' >{event.title}</Text>
            <Text className='text-lg font semi-bold uppercase text-amber-800'>
            {dayjs(event.datetime).format('ddd,D MMM')} . {dayjs(event.datetime).format('hh:mm A')} 
            </Text>
            <Text className='text-lg font-bold' >
                {event.location}
            </Text>
            <Text className='text-lg' >
                {event.description}
            </Text>

            <Link href={`/event/${event.id}/attendance`}>
                View Attendance
            </Link>

            {/* Footer */}

            <View className="absolute bottom-0 left-0  right-0 flex-row justify-between border-t-2 border-gray-400 p-5 pb-10 items-center">
            <Text className="text-xl font-semibold">Free</Text>
                {attendance ? (
                    <Text className="text-green-500 font-bold">You Are Attending</Text>
                ):(
                <Pressable onPress={()=>joinEvent()} className="bg-red-500 p-5 px-8 rounded-md">
                    <Text className="text-lg font-bold text-white">Join and Rsvp</Text>
                </Pressable>)}
            </View>
        </View>
    )
}