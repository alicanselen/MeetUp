import Feather from '@expo/vector-icons/Feather';
import { View , Text,Image ,Pressable} from 'react-native';
import  dayjs from 'dayjs'
import { Link } from 'expo-router';



export default function EventListItem({event}){
    return(
        <Link href={`/${event.id}`} asChild>
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
       <Image 
       source={{uri:event.image}}
       className='w-2/5 aspect-video rounded-xl'
       />
  
        </View>
       {/*Footer */}
       <View className='flex-row gap-3'>
        <Text className='text-gray-700 mr-auto'>16 Going</Text>
  
        <Feather name="share" size={20} color="gray" />
        <Feather name="bookmark" size={24} color="gray" />
       </View>
       </Pressable>
       </Link>
    )
}