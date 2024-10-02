import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import DatePicker from "react-native-date-picker";
import Avatar from "~/components/Avatar";
import { useAuth } from "~/contexts/AuthProvider";
import { supabase } from "~/utils/supabase";

export default function CreateEvent(){
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [ title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [loading , isLoading] = useState(false)
    const [  imageUrl , setImageUrl]=useState('')
    const {user}= useAuth();

    const createEvent = async ()=>{
        isLoading(true)
        const { data, error } = await supabase
        .from('events')
        .insert([
        { 
            title, 
            description,
            datetime:date.toISOString(),
            user_id:user.id,
            image_uri:imageUrl,

        },
        ])
        .select()
        .single();
        if(error){
            Alert.alert('Failed to Crate Event' , error.message);
        }else{

        setTitle('');
        setDescription('');
        setDate(new Date());
        router.push(`/event/${data.id}`);
        }
        isLoading(false);
                
    }
    return (
        <View className="bg-white flex-1 p-5 gap-3">
            <View className='items-center'>
                <Avatar
                size={200}
                url={imageUrl}
                onUpload={(url: string) => {
                setImageUrl(url);
                }}
                />
            </View>
            <TextInput 
            value={title}
            onChangeText={(text)=>setTitle(text)}
            placeholder="Title"
            className='border p-3 border-gray-200 rounded-md'
            />

            <TextInput 
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline
            numberOfLines={3}
            className='min-h-32 border p-3 border-gray-200 rounded-md'
            />
            <Text
            className="border p-3 border-gray-200 rounded-md" 
            onPress={()=>setOpen(true)}>{date.toLocaleString()}</Text>

            <DatePicker
             modal
             open={open}
            date={date}
            minimumDate={new Date()}
            minuteInterval={15}
             onConfirm={(date) => {
            setOpen(false)
            setDate(date)
            }}
            onCancel={() => {
            setOpen(false)
            }}
            />

        <Pressable 
        onPress={() => createEvent()}
        disabled={loading}
         className="bg-red-500 p-3 px-8 rounded-md mt-auto items-center">
        <Text className="text-lg font-bold text-white"> Create Event</Text>
        </Pressable>

        </View>
    );
}