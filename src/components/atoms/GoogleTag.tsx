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
  </>
);

export default GoogleTag;
