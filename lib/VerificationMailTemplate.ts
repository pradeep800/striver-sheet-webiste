export default function Validate(magicLink: string) {
  return `
     <table class="main" style="width: 100%; height: 100%;">
      <tr>
        <td>
          <table
            class="container"
            style="
              max-width: 400px;
              padding: 10px;
              font-family: Arial, sans-serif;
              letter-spacing: 1px;
              margin: 0 auto;
            "
          >
            <tr>
              <td>
                <h2 style="font-weight: 100;">Verify Your Email Address</h2>
                <p>
                  Ready to tackle the questions from the Striver's sheet? Just
                  click the button below to verify your Gmail account and get
                  started.
                </p>
                <table style="margin: 0 auto;">
                  <tr>
                    <td>
                      <button
                        style="
                          border-radius: 30px;
                          background: #44e38c;
                          padding: 8px;
                          text-decoration: none;
                        "
                      >
                        <a style="text-decoration: none; color:black;" href="${magicLink}"
                          >Verify Your Email</a
                        >
                      </button>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
`;
}
