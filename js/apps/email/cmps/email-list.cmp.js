import emailPreview from "./email-preview.cmp.js";

export default {
  props: ["emails"],
  template: `
        <ul class="email-list clean-list flex wrap align-center space-around column">
          <email-preview v-for='email in emails' :email='email' :key='email.id'>
          </email-preview>
        </ul>
    `,
  components: {
    emailPreview,
  },
};
