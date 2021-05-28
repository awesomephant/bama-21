import CMS from 'netlify-cms-app';
CMS.init();

CMS.registerEditorComponent({
  id: "embed",
  label: "Embed",
  fields: [
    {
      name: "code",
      label: "Embed Code",
      widget: "text",
    },
    {
      name: "caption",
      label: "Caption",
      widget: "string",
    },
  ],

  pattern: /^\{% embed "([\S ]+)" %}/,
  fromBlock: function (match) {
    let embed = JSON.parse(decodeURIComponent(match[1]));
    return embed;
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj) {
    let data = {};
    if (obj.code) {
      data = obj;
    }

    let json = encodeURIComponent(JSON.stringify(data))

    return `\{% embed "${json}" %}`;
  },
  toPreview: function (obj) {
    return "";
  },
});