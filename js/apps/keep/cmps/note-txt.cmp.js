export default {
    name: 'note-txt',
    props:["info"],
    template: `
      <section class="note-txt">
            {{info.txt}}
      </section>
      `,
  };
  