/** Mean solar day in seconds. */
export const SOLAR_DAY_S = 86400;
/** Sidereal day in seconds. */
export const SIDEREAL_DAY_S = 86164.0905;

/** 1部 OPEN 13:30 JST on 2026-09-20. 整列は30分前の 13:00 から可能。 */
export const LIVE_OPEN_ISO = "2026-09-20T13:30:00+09:00";
export const LIVE_START_ISO = "2026-09-20T13:45:00+09:00";
export const LIVE_OPEN_2_ISO = "2026-09-20T18:00:00+09:00";
export const LIVE_START_2_ISO = "2026-09-20T18:15:00+09:00";

export const LIVE_OPEN_MS = Date.parse(LIVE_OPEN_ISO);
export const LIVE_START_MS = Date.parse(LIVE_START_ISO);

export type RotationSnapshot = {
  nowMs: number;
  remainingMs: number;
  elapsed: boolean;
  solar: number;
  sidereal: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function snapshotAt(nowMs: number, targetMs = LIVE_OPEN_MS): RotationSnapshot {
  const remainingMs = targetMs - nowMs;
  const elapsed = remainingMs <= 0;
  const abs = Math.abs(remainingMs);
  const solar = abs / (SOLAR_DAY_S * 1000);
  const sidereal = abs / (SIDEREAL_DAY_S * 1000);
  const totalSec = Math.floor(abs / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { nowMs, remainingMs, elapsed, solar, sidereal, days, hours, minutes, seconds };
}

export type FactStatus = "confirmed" | "unconfirmed";

export type EventFact = {
  label: string;
  value: string;
  status: FactStatus;
  href?: string;
};

export const EVENT = {
  title: "ウタオド vol.26",
  artist: "eto",
  artistHandle: "@eto_202402",
  artistUrl: "https://x.com/eto_202402",
  organizer: "あのん",
  organizerHandle: "@anon_non_non_",
  organizerUrl: "https://x.com/anon_non_non_",
  dateLabel: "2026年9月20日（日）",
  openLabel: "1部 13:30 / 2部 18:00",
  startLabel: "1部 13:45 / 2部 18:15",
  venue: "LIVE GARDEN",
  venueUrl: "https://gardenmjp.wixsite.com/garden",
  venueX: "https://x.com/LIVEGARDEN_MJP",
  address: "名古屋市中区古渡町15-22 1F",
  access: "金山駅から徒歩約8分",
  price: "各部 ¥2,500 + 1ドリンク ¥600",
  capacity: "椅子＋立ち見でおよそ30人",
  notes: "完全禁煙。整理番号なし。当日整列順。1部は13:00から整列可能。LIVE GARDEN共同主催。",
  ticket1: "https://tiget.net/events/519996",
  ticket2: "https://tiget.net/events/519999",
} as const;

export const FACTS: EventFact[] = [
  { label: "正式名称", value: "ウタオド vol.26", status: "confirmed", href: "https://x.com/anon_non_non_/status/2095436645285626235" },
  { label: "主催", value: "あのん（@anon_non_non_）× LIVE GARDEN", status: "confirmed", href: EVENT.organizerUrl },
  { label: "日程", value: "2026/09/20（日）※告知本文の8/29は誤り、訂正は9/20", status: "confirmed", href: "https://x.com/anon_non_non_/status/2095447280992321748" },
  { label: "1部", value: "OPEN 13:30 / START 13:45、整列13:00から", status: "confirmed", href: EVENT.ticket1 },
  { label: "2部", value: "OPEN 18:00 / START 18:15、整列17:30から", status: "confirmed", href: EVENT.ticket2 },
  { label: "eto", value: "1部のみ（初名古屋）", status: "confirmed", href: EVENT.artistUrl },
  { label: "1部出演", value: "あのん / せのん / eto / 夜灯みや", status: "confirmed", href: EVENT.ticket1 },
  { label: "2部出演", value: "あのん / せのん / MASA", status: "confirmed", href: EVENT.ticket2 },
  { label: "両部", value: "あのん・せのん", status: "confirmed" },
  { label: "会場", value: "LIVE GARDEN（名古屋・金山）", status: "confirmed", href: EVENT.venueUrl },
  { label: "住所", value: EVENT.address, status: "confirmed" },
  { label: "アクセス", value: EVENT.access, status: "confirmed" },
  { label: "料金", value: EVENT.price, status: "confirmed" },
  { label: "チケット", value: "TIGET、当日応接払い、整理番号なし", status: "confirmed", href: EVENT.ticket1 },
  { label: "花・贈答", value: "受け取り可能（時間・置き場は未記載）", status: "confirmed", href: "https://x.com/eto_202402/status/2092595515229933928" },
  { label: "交流会", value: "終演後。出演者からメッセージあり", status: "confirmed", href: "https://x.com/anon_non_non_/status/2095436645285626235" },
  { label: "物販", value: "イベント限定サイン付きイラスト ¥1,000。両部購入でトレーディングサイズプレゼント", status: "confirmed", href: "https://x.com/anon_non_non_/status/2095436645285626235" },
];

export type SourcePost = {
  id: string;
  date: string;
  author: string;
  summary: string;
  url: string;
};

export const SOURCES: SourcePost[] = [
  {
    id: "2063246454253293920",
    date: "2026-06-06",
    author: "eto",
    summary: "誕生日配信で 9/20 名古屋ライブと、近々の「結構大きい」追加告知を予告。",
    url: "https://x.com/eto_202402/status/2063246454253293920",
  },
  {
    id: "2091506367182025141",
    date: "2026-08-23",
    author: "あのん",
    summary: "9/20 名古屋の歌い手・踊り手合同イベントとして出演者を募集。",
    url: "https://x.com/anon_non_non_/status/2091506367182025141",
  },
  {
    id: "2092376795874263374",
    date: "2026-08-26",
    author: "eto",
    summary: "「初の名古屋ライブです。来られる人来てください」と公開呼びかけ。",
    url: "https://x.com/eto_202402/status/2092376795874263374",
  },
  {
    id: "2092561163037089928",
    date: "2026-08-26",
    author: "eto",
    summary: "OPEN 13:00 / START 13:45 と書いた。後の公式で1部OPENは13:30に修正。",
    url: "https://x.com/eto_202402/status/2092561163037089928",
  },
  {
    id: "2092595515229933928",
    date: "2026-08-26",
    author: "eto",
    summary: "お花の受け取り可能・交流会あり・そのライブ限定の物販あり。",
    url: "https://x.com/eto_202402/status/2092595515229933928",
  },
  {
    id: "2093714121703469155",
    date: "2026-08-29",
    author: "あのん",
    summary: "vol.25 御礼で「次回のウタオドは 9/20」と明言。",
    url: "https://x.com/anon_non_non_/status/2093714121703469155",
  },
  {
    id: "2095436645285626235",
    date: "2026-09-03",
    author: "あのん",
    summary: "ウタオド vol.26 公式解禁。本文の日付は8/29のまま。TIGET 1部/2部を掲載。",
    url: "https://x.com/anon_non_non_/status/2095436645285626235",
  },
  {
    id: "2095447280992321748",
    date: "2026-09-03",
    author: "あのん",
    summary: "「正しくは9/20です！！！！」と日付誤りを訂正。",
    url: "https://x.com/anon_non_non_/status/2095447280992321748",
  },
];

export const STILL_MISSING = [
  "花の受け取り時間と置き場所",
  "交流会の開始時刻（1部終演後か2部終演後か）",
  "6月に予告された「結構大きい」追加告知",
];
