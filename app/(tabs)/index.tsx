import { Stack } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { View , Text,Image , FlatList } from 'react-native';

import events from '~/assets/event.json'
import EventListItem from '~/components/EventListItem';
export default function Events() {
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

