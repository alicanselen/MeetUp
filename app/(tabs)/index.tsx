import { Stack } from 'expo-router';
import * as Location from 'expo-location';
import { View , Text,Image , FlatList, Alert } from 'react-native';
import EventListItem from '~/components/EventListItem';
import { supabase } from '~/utils/supabase';
import { useEffect, useState } from 'react';
import { NearbyEvent } from '~/types/db';

export default function Events() {

  const [location, setLocation] = useState<Location.LocationObject |null>(null);
  const [events , setEvents] = useState<NearbyEvent[]>([]);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  useEffect(()=> {
    if(location){
      fetchNearbyEvents();
    }
  },[location]);


  const fetchAllEvents = async ()=>{
  const { data, error } = await supabase.from('events').select('*');
  setEvents(data);
  };

  const fetchNearbyEvents = async ()=>{
    if(!location){
      return;
    }
    const {data , error }  = await supabase.rpc('nearby_events' ,  {
      lat:location.coords.latitude, 
      long:location.coords.longitude,
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

