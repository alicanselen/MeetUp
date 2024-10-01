import { Stack } from 'expo-router';;
import { View , Text,Image , FlatList } from 'react-native';
import EventListItem from '~/components/EventListItem';
import { supabase } from '~/utils/supabase';
import { useEffect, useState } from 'react';
export default function Events() {
  const [events , setEvents] = useState([]);


  useEffect(()=> {
    fetchEvents();
  },[]);


  const fetchEvents = async ()=>{
  const { data, error } = await supabase.from('events').select('*');
  setEvents(data);
  };
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

