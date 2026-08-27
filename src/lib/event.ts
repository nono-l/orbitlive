/** Mean solar day in seconds. */
export const SOLAR_DAY_S = 86400;
/** Sidereal day in seconds. */
export const SIDEREAL_DAY_S = 86164.0905;

/** OPEN 13:00 JST on 2026-09-20. */
export const LIVE_OPEN_ISO = "2026-09-20T13:00:00+09:00";
export const LIVE_START_ISO = "2026-09-20T13:45:00+09:00";

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
  title: "eto 初名古屋ライブ",
  artist: "eto",
  artistHandle: "@eto_202402",
  artistUrl: "https://x.com/eto_202402",
  organizer: "あのん",
  organizerHandle: "@anon_non_non_",
  organizerUrl: "https://x.com/anon_non_non_",
  dateLabel: "2026年9月20日（日）",
  openLabel: "13:00",
  startLabel: "13:45",
  venue: "LIVE GARDEN",
  venueUrl: "https://gardenmjp.wixsite.com/garden",
  venueX: "https://x.com/LIVEGARDEN_MJP",
  address: "名古屋市中区古渡町15-22 1F",
  access: "金山駅から徒歩約8分",
  price: "¥2,500 + 1ドリンク ¥600",
  capacity: "椅子＋立ち見でおよそ30人",
  notes: "完全禁煙。整理番号なし・当日整列が系列イベントの慣例。",
} as const;

export const FACTS: EventFact[] = [
  { label: "出演", value: "eto（@eto_202402）— 初名古屋", status: "confirmed", href: EVENT.artistUrl },
  { label: "主催", value: "あのん（@anon_non_non_）", status: "confirmed", href: EVENT.organizerUrl },
  { label: "日程", value: "2026/09/20（日）", status: "confirmed" },
  { label: "開場", value: "13:00 JST", status: "confirmed" },
  { label: "開演", value: "13:45 JST", status: "confirmed" },
  { label: "会場", value: "LIVE GARDEN（名古屋・金山）", status: "confirmed", href: EVENT.venueUrl },
  { label: "住所", value: EVENT.address, status: "confirmed" },
  { label: "アクセス", value: EVENT.access, status: "confirmed" },
  { label: "料金", value: EVENT.price, status: "confirmed" },
  { label: "規模", value: EVENT.capacity, status: "confirmed" },
  { label: "形式", value: "歌い手・踊り手合同イベント", status: "confirmed" },
  { label: "花・贈答", value: "受け取り可能（時間・置き場は未記載）", status: "confirmed", href: "https://x.com/eto_202402/status/2092595515229933928" },
  { label: "交流会", value: "あり（開始時刻は未記載）", status: "confirmed", href: "https://x.com/eto_202402/status/2092595515229933928" },
  { label: "物販", value: "そのライブ限定あり（品目・価格は未記載）", status: "confirmed", href: "https://x.com/eto_202402/status/2092595515229933928" },
  { label: "チケット", value: "販売ページ未公開（系列は TIGET）", status: "unconfirmed" },
  { label: "正式名称", value: "ウタオド系列かは未確定", status: "unconfirmed" },
  { label: "出演者一覧", value: "8/23時点で出演者募集中", status: "unconfirmed" },
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
    summary: "9/20 名古屋の歌い手・踊り手合同イベントとして出演者を募集。初ライブもサポートすると案内。",
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
    summary: "主催・日程・OPEN 13:00 / START 13:45・LIVE GARDEN・¥2500+1D を初めて一枚に記載。",
    url: "https://x.com/eto_202402/status/2092561163037089928",
  },
  {
    id: "2092565105141817823",
    date: "2026-08-26",
    author: "eto",
    summary: "会場サイトを「場所はここ！」と確定。この時点では花は確認中。",
    url: "https://x.com/eto_202402/status/2092565105141817823",
  },
  {
    id: "2092595515229933928",
    date: "2026-08-26",
    author: "eto",
    summary: "お花の受け取り可能・交流会あり・そのライブ限定の物販あり、と確定。",
    url: "https://x.com/eto_202402/status/2092595515229933928",
  },
];

export const STILL_MISSING = [
  "正式なイベント名と巻号",
  "予約・チケット URL",
  "出演者の確定リスト",
  "花の受け取り時間と置き場所",
  "交流会の開始時刻",
  "物販の品目と価格",
  "6月に予告された「結構大きい」追加告知",
];
