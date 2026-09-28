const SUPABASE_URL =
"https://irajgguctyxzgpqqhlgr.supabase.co";

const SUPABASE_KEY =
"sb_publishable_0FZCm7P_vDBp6KH6XhR6fg_q6-4fFUx";

const supabaseClient =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const form =
document.getElementById("formLogin");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
    document.getElementById("email").value;

    const senha =
    document.getElementById("senha").value;

    const { error } =
    await supabaseClient.auth.signInWithPassword({
        email,
        password: senha
    });

    if(error){

    console.error(error);
    alert(error.message);
    return;
    }

    alert("Login realizado!");

    window.location.href = "index.html";
});