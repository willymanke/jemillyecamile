const SUPABASE_URL = "https://irajgguctyxzgpqqhlgr.supabase.co";
const SUPABASE_KEY = "sb_publishable_0FZCm7P_vDBp6KH6XhR6fg_q6-4fFUx";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const form = document.getElementById("formItem");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const quantidade = document.getElementById("quantidade").value;
    const categoria = document.getElementById("categoria").value;
    const status = document.getElementById("status").value;

    const { error } = await supabaseClient
        .from("item")
        .insert([
            {
                nome,
                quantidade,
                categoria,
                status
            }
        ]);

    if(error){

        console.error(error);

        mensagem.innerHTML =
            "Erro ao salvar item.";

    }else{

        mensagem.innerHTML =
            "Item cadastrado com sucesso!";

        form.reset();
    }

});