import Feather from '@expo/vector-icons/Feather';
import { View , Text,Image ,Pressable} from 'react-native';
import  dayjs from 'dayjs'
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabase';
import SupaImage from './SupaImage';



export default function EventListItem({event}){

    const [numberOfAttendees , setNumberOfAttendees] = useState(0);

    useEffect(()=>{
        fetchNumberOfAttendees();
    } , [event.id]);
    const fetchNumberOfAttendees = async ()=>{
        const { count, error } = await supabase
        .from('attendance')  // 'attendence' yerine 'attendance' olmalı, eğer tablo ismi böyleyse
        .select('*', { count: 'exact', head: true })  // * yerine sadece count bilgisi almak istiyorsak sütun seçmeyebiliriz
        .eq('event_id', event.id);

        setNumberOfAttendees(count);
    };
    return(
        <Link href={`/event/${event.id}`} asChild>
        <Pressable className='p-3 gap-3 border-b-2 border-gray-100 pb-3'>
        <View className='flex-row'>
          <View className='flex-1 gap-2'>
        <Text className='text-lg font semi-bold uppercase text-amber-800'>
            {dayjs(event.datetime).format('ddd,D MMM')} . {dayjs(event.datetime).format('hh:mm')} 
            </Text>
        <Text className='text-xl font-bold' >
            {event.title}
            </Text>

            
        <Text className='text-gray-700 '>
            {event.location}
            </Text>
        </View>
  
       {/* Event Image */}
       {event.image_uri &&(       
       <SupaImage 
       path={event.image_uri}
       className='w-2/5 aspect-video rounded-xl'
       />)}
  
        </View>
       {/*Footer */}
       <View className='flex-row gap-3'>
        <Text className='text-gray-700 mr-auto'>{numberOfAttendees} Going</Text>
  
        <Feather name="share" size={20} color="gray" />
        <Feather name="bookmark" size={24} color="gray" />
       </View>
       </Pressable>
       </Link>
    )
}