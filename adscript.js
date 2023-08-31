const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
const script = document.createElement('script');
script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6890415870609973';
script.async = true;
return script;
}