import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LLMClient } from 'react-native-gpt-api-feed';

import { OPENAI_API_KEY } from '../config.json';

export default function App() {
  const [answer, setAnswer] = React.useState<string>('');

  React.useEffect(() => {
    (async () => {
      LLMClient.setOpenAiApiKey(OPENAI_API_KEY);
      const answer = await LLMClient.askToGPT_3_dot_5('Hi ChatGPT!');
      setAnswer(answer);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>answer: {answer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
