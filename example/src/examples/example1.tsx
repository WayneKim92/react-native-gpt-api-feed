import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LLMClient } from 'react-native-gpt-api-feed';
import { Spacer } from '@wayne-kim/react-native-layout';

import { OPENAI_API_KEY } from '../../config.json';

export default function App() {
  const [answer, setAnswer] = React.useState<string>('');

  const meta = `
- 오늘 날짜: ${new Date().toISOString()}
`;
  const precondition = `
- 나는 API에 보낼 매개변수를 생성 요청할 거야.
- 내 질문에 적합한 params 데이터를 JSON으로 파싱할 수 있는 문자열로 응답해라.
- JONS 형식으로 응답하고 다른 말은 하지마.
- API에서 허용하는 매개변수의 유형은 아래와 같아.
`;
  const apiParamType = `
interface GetContentListParams {
  contentType: '게시판' | '게시판-댓글' | '공지' | '공지-댓글'
  startAt: string // YYYY-MM-DD
  endAt?: string // YYYY-MM-DD
  status?: '열림'| '숨김' | '삭제'
  searchFilter?: '관리자' | '사용자'
  searchKeyword?: string
  page?: number
  size?: number
}
 `;

  const question = '최근 일주일 게시물 목록';
  const message = `
# 메타 정보
${meta.trim()}

# 전제 조건
${precondition}

\`\`\`
${apiParamType}}
\`\`\`

- 질문: "${question}"
`;

  React.useEffect(() => {
    (async () => {
      LLMClient.setOpenAiApiKey(OPENAI_API_KEY);
      const answer = await LLMClient.askToGPT_3_dot_5(message);
      const json = JSON.parse(answer);
      setAnswer(JSON.stringify(json, null, 2));
    })();
  }, [message]);

  return (
    <View style={styles.container}>
      <Text>메타 정보</Text>
      <Text>{meta.trim()}</Text>

      <Spacer size={16} />

      <Text>질문</Text>
      <Text>{question.trim()}</Text>

      <Spacer size={16} />

      <Text>답변</Text>
      <Text>{answer.trim()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
