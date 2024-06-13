import * as React from 'react';
import { StyleSheet, View, Text, Image, Button, TextInput } from 'react-native';
import { LLMClient } from 'react-native-gpt-api-feed';
import { Spacer } from '@wayne-kim/react-native-layout';

import { OPENAI_API_KEY } from '../../config.json';

export default function App() {
  const [question, setQuestion] = React.useState<string>(
    '세로가 더 긴 직사각형 이미지 표시해라'
  );
  const [answer, setAnswer] = React.useState<{
    width?: number;
    height?: number;
  }>({});
  const [isFailed, setIsFailed] = React.useState(false);

  const meta = `
- none
`;
  const precondition = `
- 나는 API에 보낼 매개변수를 생성 요청할 거야.
- 내 질문에 적합한 params 데이터를 JSON으로 파싱할 수 있는 문자열로 응답해라.
- JONS 형식으로 응답하고 다른 말은 하지마. 이 규칙은 꼭 지켜!
- API에서 허용하는 매개변수의 유형은 아래와 같아.
`;
  const apiParamType = `
interface GetPlaceholderImageParams {
  width: number; // 최대 너비는 300px
  height: number;
}
 `;
  const message = `
# 메타 정보
${meta.trim()}

# 답변 규칙
${precondition}

\`\`\`
${apiParamType}}
\`\`\`

- 질문: "${question}"
`;

  const handlePress = async () => {
    try {
      LLMClient.setOpenAiApiKey(OPENAI_API_KEY);
      const answer = await LLMClient.askToGPT_3_dot_5(message);
      const json = JSON.parse(answer);
      setAnswer(json);
    } catch (error) {
      setIsFailed(true);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>API의 매개변수 정보</Text>
      <Text>{apiParamType.trim()}</Text>

      <Spacer size={16} />

      <Text>메타 정보</Text>
      <Text>{meta.trim()}</Text>

      <Spacer size={16} />

      <Text>질문</Text>
      <Spacer size={8} />
      <TextInput
        value={question}
        onChangeText={setQuestion}
        style={{ padding: 16, borderColor: 'lightblue', borderWidth: 1 }}
      />
      <Spacer size={8} />
      <Button title={'요청'} onPress={handlePress} />

      <Spacer size={16} />

      <Text>답변</Text>
      <Text>
        {isFailed ? '사용불가 형식 입니다.' : JSON.stringify(answer, null, 2)}
      </Text>

      <Spacer size={16} />

      <Text>샘플 이미지</Text>
      <Image
        src={`https://placehold.co/${answer?.width}x${answer?.height}`}
        style={{
          width: answer?.width,
          height: answer?.height,
          backgroundColor: 'blue',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
