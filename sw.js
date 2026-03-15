const CACHE_NAME = 'attendance-pro-v5'; // 버전 업

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

// 설치 즉시 활성화 준비
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); 
});

// ✅ 핵심 수정: 활성화되자마자 즉시 현재 열려있는 앱 페이지들을 제어함
self.addEventListener('activate', (e) => {
  e.waitUntil(
    Promise.all([
      self.clients.claim(), // 즉시 제어권 획득
      caches.keys().then((keys) => {
        return Promise.all(keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        }));
      })
    ])
  );
});

self.addEventListener('fetch', (e) => {
  // 네트워크가 안 될 때만 캐시를 사용하는 게 아니라, 캐시된 게 있으면 무조건 캐시에서 먼저 꺼내옴 (속도 향상)
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
