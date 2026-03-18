const send = document.getElementById("send");

const Apikey = CONFIG.API_KEY;

send.addEventListener("click", async () => {
  const question = document.getElementById("message").value.trim();
  if (question === "") {
    Swal.fire({
      title: "Please Ask Question",
      icon: "error",
    });
  } else {
    try {
      chatsec.innerHTML += `
    <!-- User Message -->
  <div class="flex justify-end lg:p-5 px-3">
    <div id="user" class="bg-[#3B82F6] lg:p-3 p-2 rounded-t-2xl rounded-bl-2xl flex items-start lg:gap-3 gap-2 w-fit lg:max-w-[60%] max-w-[80%]">
      <i class="ri-user-3-line text-2xl text-[#E2E8F0] "></i>
      <h1 class="lg:text-xl text-md font-medium text-[#E2E8F0] leading-relaxed">
      ${question}
      </h1>
    </div>
  </div>
    `;
      const loader = document.createElement("div");
      loader.classList.add("flex", "lg:pl-10", "pl-8");
      loader.innerHTML = `
        <div class="lg:p-4 p-2 rounded-t-2xl rounded-br-2xl flex items-start lg:gap-3 gap-2 w-fit lg:max-w-[60%] max-w-[80%]">
          <span class="loader"></span>
        </div>
      `;
      chatsec.appendChild(loader);
      document.getElementById("message").value = "";
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${Apikey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: question,
                  },
                ],
              },
            ],
          }),
        },
      );

      const data = await res.json();
      loader.remove();
      chatsec.innerHTML += ` 
      
      <!-- AI Message -->
  <div class="flex lg:p-5  p-3">
    <div  class="bg-[#1E293B] lg:p-4 p-2 rounded-t-2xl rounded-br-2xl flex items-start lg:gap-3  gap-2 w-fit lg:max-w-[60%] max-w-[80%]">
      <i class="ri-robot-2-line text-2xl text-[#E2E8F0] "></i>
      <h1 id="Chatbot" class="lg:text-xl text-md font-semibold text-[#E2E8F0] leading-relaxed">
        ${data.candidates[0].content.parts[0].text}
      </h1>
    </div>
  </div>`;

      chat.innerHTML = data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.log(error);
    }
  }
});
