/** LIVE GARDEN — NAVITIME POI 35.14832, 136.899451 */
export const VENUE_LAT = 35.14832;
export const VENUE_LNG = 136.899451;
export const VENUE_QUERY = "愛知県名古屋市中区古渡町15-22 LIVE GARDEN";
export const VENUE_ADDRESS = "愛知県名古屋市中区古渡町15-22";
export const NEAREST_STATION = "金山";
/** 会場サイトの案内。駅終着アプリの到着からこの分を引く。 */
export const WALK_MINUTES = 8;
/** 会場着：開場 13:00 の5分後 */
export const VENUE_ARRIVE_LABEL = "13:05";
/** 金山着：13:05 − 徒歩8分 */
export const STATION_ARRIVE_LABEL = "12:57";
/** 2026-09-20 13:05:00+09:00 — Google の会場着 */
export const VENUE_ARRIVE_UNIX = 1789877100;

export type NavAppLink = {
  id: string;
  label: string;
  href: string;
  arrive: string;
};

export type Departure = {
  id: string;
  city: string;
  station: string;
  hint: string;
  links: NavAppLink[];
};

function linksFrom(station: string): NavAppLink[] {
  const origin = `${station}駅`;
  const destGeo = `${VENUE_LAT},${VENUE_LNG}`;
  const destStation = NEAREST_STATION;
  return [
    {
      id: "google",
      label: "Google マップ",
      arrive: `会場 ${VENUE_ARRIVE_LABEL}`,
      href: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destGeo)}&travelmode=transit&arrival_time=${VENUE_ARRIVE_UNIX}`,
    },
    {
      id: "apple",
      label: "Apple マップ",
      arrive: `会場 ${VENUE_ARRIVE_LABEL}`,
      href: `https://maps.apple.com/?saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(destGeo)}&dirflg=r`,
    },
    {
      id: "yahoo",
      label: "Yahoo!乗換",
      arrive: `会場 ${VENUE_ARRIVE_LABEL}`,
      href: `https://transit.yahoo.co.jp/search/result?from=${encodeURIComponent(station)}&to=${encodeURIComponent(VENUE_ADDRESS)}&y=2026&m=09&d=20&hh=13&m1=0&m2=5&type=4&ticket=ic&expkind=1&ws=3&s=0&al=1&shin=1&ex=1&hb=1&lb=1&sr=1`,
    },
    {
      id: "navitime",
      label: "NAVITIME",
      arrive: `金山 ${STATION_ARRIVE_LABEL}`,
      href: `https://www.navitime.co.jp/transfer/searchlist?orvStationName=${encodeURIComponent(station)}&dnvStationName=${encodeURIComponent(destStation)}&month=${encodeURIComponent("2026/09")}&day=20&hour=12&minute=57&basis=0`,
    },
    {
      id: "jorudan",
      label: "乗換案内",
      arrive: `金山 ${STATION_ARRIVE_LABEL}`,
      href: `https://www.jorudan.co.jp/norikae/cgi/nori.cgi?Sok=1&eki1=${encodeURIComponent(station)}&eki2=${encodeURIComponent(destStation)}&Dym=202609&Ddd=20&Dhh=12&Dmn=57&Cway=1&Cfp=1`,
    },
  ];
}

export const DEPARTURES: Departure[] = [
  {
    id: "osaka",
    city: "大阪",
    station: "新大阪",
    hint: "新幹線は新大阪起点",
    links: linksFrom("新大阪"),
  },
  {
    id: "nagoya",
    city: "名古屋",
    station: "名古屋",
    hint: "在来線・地下鉄から金山へ",
    links: linksFrom("名古屋"),
  },
  {
    id: "yokohama",
    city: "横浜",
    station: "横浜",
    hint: "品川経由の新幹線が多い",
    links: linksFrom("横浜"),
  },
  {
    id: "tokyo",
    city: "東京",
    station: "東京",
    hint: "東海道新幹線",
    links: linksFrom("東京"),
  },
];

export const LAST_MILE: NavAppLink[] = [
  {
    id: "walk-google",
    label: "Google 徒歩",
    arrive: "約8分",
    href: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent("金山駅")}&destination=${encodeURIComponent(`${VENUE_LAT},${VENUE_LNG}`)}&travelmode=walking`,
  },
  {
    id: "walk-apple",
    label: "Apple 徒歩",
    arrive: "約8分",
    href: `https://maps.apple.com/?saddr=${encodeURIComponent("金山駅")}&daddr=${encodeURIComponent(`${VENUE_LAT},${VENUE_LNG}`)}&dirflg=w`,
  },
];
