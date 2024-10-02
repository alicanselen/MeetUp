import { Stack } from 'expo-router';;
import { View , Text,Image , FlatList } from 'react-native';
import EventListItem from '~/components/EventListItem';
import { supabase } from '~/utils/supabase';
import { useEffect, useState } from 'react';
import { NearbyEvent } from '~/types/db';
export default function Events() {
  const [events , setEvents] = useState<NearbyEvent[]>([]);


  useEffect(()=> {
    fetchNearbyEvents();
  },[]);


  const fetchAllEvents = async ()=>{
  const { data, error } = await supabase.from('events').select('*');
  setEvents(data);
  };

  const fetchNearbyEvents = async ()=>{
    const {data , error }  = await supabase.rpc('nearby_events' ,  {
      lat:41.137978, 
      long:29.053537,
    });
    console.log(data);
    console.log(error);
    setEvents(data);
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Events ' }} />
      {/* Event Listesi Item*/}
      <FlatList
      data={events}
      renderItem={({item})=> <EventListItem event={item}/>}
      className='bg-white'/>
    </>
  );
}

