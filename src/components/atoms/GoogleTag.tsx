//eslint-disable
export const GoogleTag = () => (
  <>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-VV2RGG7VGM"
    ></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            
            gtag('js', new Date());
            gtag('config', 'G-VV2RGG7VGM');
            `
      }}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
            (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TWF89SRB');
            `
      }}
    />
  </>
);

export default GoogleTag;
