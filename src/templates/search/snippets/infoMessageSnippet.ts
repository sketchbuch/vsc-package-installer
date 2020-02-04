export const infoMessageSnippet = (heading: string, message: string) => {
  return `
    <div class="info-message">
      <h2>${heading}</h2>
      <p>${message}</p>
    </div>
  `;
};
