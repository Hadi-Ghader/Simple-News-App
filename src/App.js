import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const API_URL = 'https://gnews.io/api/v4';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${API_URL}/top-headlines?country=us&token=897e61f7b8f13d267dd17e28c18f7967`);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const searchArticles = async () => {
    try {
      const response = await axios.get(`${API_URL}/search?q=${searchQuery}&token=897e61f7b8f13d267dd17e28c18f7967`);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error searching articles:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Search articles"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <Button title="Search" onPress={searchArticles} />
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.author}</Text>
            <Text>{item.publishedAt}</Text>
          </View>
        )}
        keyExtractor={item => item.url}
      />
    </View>
  );
};

export default App;
