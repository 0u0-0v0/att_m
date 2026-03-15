const CACHE_NAME = 'attendance-pro-v6';

// ✅ 캐시할 파일 목록 (라이브러리 및 모든 민산스 폰트 포함)
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Thin.woff',
  'https://cdn.jsdelivr.net/gh/projectnoonnu/2508-1@1.0/MinSans-ExtraLight.woff2',
  'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Light.woff',
  'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Regular.woff',
  'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Medium.woff',
  'https://cdn.jsdelivr.net/gh/projectnoonnu/2508-1@1.0/MinSans-Bold.woff2',
  'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Bold.woff',
  'https://cdn.jsdelivr.net/gh/projectnoonnu/2508-1@1.0/MinSans-ExtraBold.woff2',
  'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Black.woff'
];

// 설치 시 캐싱
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 활성화 시 제어권 즉시 획득 및 옛 캐시 삭제
self.addEventListener('activate', (e) => {
  e.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) => Promise.all(
        keys.map((key) => { if (key !== CACHE_NAME) return caches.delete(key); })
      ))
    ])
  );
});

// ✅ 네트워크 요청 가로채기 (캐시 우선 전략으로 오프라인 속도 극대화)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
