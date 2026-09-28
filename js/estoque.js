const SUPABASE_URL = "https://irajgguctyxzgpqqhlgr.supabase.co";

const SUPABASE_KEY = "sb_publishable_0FZCm7P_vDBp6KH6XhR6fg_q6-4fFUx";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function carregarItens() {

    const { data, error } = await supabaseClient
        .from("item")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    const tabela =
        document.getElementById("tabela-itens");

    data.forEach(item => {

        tabela.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.quantidade}</td>
                <td>${item.categoria}</td>
                <td>${item.status}</td>
            </tr>
        `;
    });
}

carregarItens();