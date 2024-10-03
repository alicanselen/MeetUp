import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getSuggestions, retriveDetails } from "~/utils/AddressAutoComplete";
import { useAuth } from "~/contexts/AuthProvider";

export default  function AdressAutoComplete({ onSelected }){
    const [ input , setInput] = useState('');
    const[ suggestions , setSuggestions] = useState([]);
    const [ selectedLocation , setSelectedLocation] = useState();
    const {session}= useAuth();

    

    const search = async ()=>{
        const data = await getSuggestions(input ,session.access_token);
        setSuggestions(data.suggestions);
    }

    const onSuggestionClicked= async (suggestion)=>{
        setSelectedLocation(suggestion);
        setInput(suggestion.name);
        setSuggestions([]);

        const details = await retriveDetails(suggestion.mapbox_id ,session.access_token);
        onSelected(details);
    };
    return(
        <View>
           <View className="flex flex-row gap3 items-center">
           <TextInput
             value={input}
             onChangeText={setInput}
             placeholder='Konum'
             className='flex-1 border p-3 border-gray-200 rounded-md'
             />
             <FontAwesome onPress={search} name="search" size={24} color="black" />
           </View>
           <View className="gap-2">
           {suggestions.map((item)=>(
            <Pressable
            onPress={()=> onSuggestionClicked(item)} 
            key={item.name} className="p-2 border rounded border-gray-300">
                <Text className="font-bold">{item.name}</Text>
                <Text>{item.place_formatted}</Text>
            </Pressable>
           ))}
           </View>
  
        </View>
    )
}