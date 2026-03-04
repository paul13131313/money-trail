import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY is not configured' }, { status: 500 });
  }

  const body = await req.json();
  const { productName, price } = body as { productName: string; price: number };

  if (!productName || !price || price <= 0) {
    return NextResponse.json({ error: '商品名と価格（正の数）を入力してください' }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  const prompt = `商品名: ${productName}
価格: ¥${price.toLocaleString()}

この商品の価格がサプライチェーンのどこに流れるか、コスト内訳をJSON形式で返してください。

ルール:
- nodes配列を返す（5〜8個）
- 各nodeのフィールド: id(英語スネークケース), name(日本語), type("retail"|"distribution"|"manufacturing"|"material"|"labor"|"other"のどれか), amount(円、整数), percentage(整数、合計100%), country(任意), description(任意、興味深い事実があれば)
- amountの合計は${price}になること
- percentageの合計は100%になること
- 前後の説明は不要、JSONのみ返してください

出力形式:
{"nodes":[...]}`;

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '';

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return NextResponse.json({ error: 'AIレスポンスの解析に失敗しました' }, { status: 500 });
  }

  const parsed = JSON.parse(jsonMatch[0]);

  if (!parsed.nodes || !Array.isArray(parsed.nodes)) {
    return NextResponse.json({ error: 'AIレスポンスのフォーマットが不正です' }, { status: 500 });
  }

  return NextResponse.json({ nodes: parsed.nodes });
}
