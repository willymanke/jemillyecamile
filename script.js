const SUPABASE_URL =
"https://irajgguctyxzgpqqhlgr.supabase.co";

const SUPABASE_KEY =
"sb_publishable_0FZCm7P_vDBp6KH6XhR6fg_q6-4fFUx";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// =========================
// CREATE
// =========================

const form = document.getElementById("formItem");

if (form) {

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nome =
            document.getElementById("nome").value;

        const quantidade =
            document.getElementById("quantidade").value;

        const categoria =
            document.getElementById("categoria").value;

        const status =
            document.getElementById("status").value;

        if (
            !nome ||
            !quantidade ||
            !categoria ||
            !status
        ) {
            alert("Preencha todos os campos!");
            return;
        }

        const { error } =
            await supabaseClient
                .from("item")
                .insert([
                    {
                        nome,
                        quantidade,
                        categoria,
                        status
                    }
                ]);

        if (error) {

            console.error(error);

            alert(
                "Erro ao cadastrar item!"
            );

            return;
        }

        alert(
            "Item cadastrado com sucesso!"
        );

        window.location.href =
            "index.html";

    });

}

// =========================
// READ
// =========================

async function carregarItens() {

    const tabela =
        document.getElementById(
            "tabelaItens"
        );

    if (!tabela) return;

    const { data, error } =
        await supabaseClient
            .from("item")
            .select("*")
            .order("id");

    if (error) {

        console.error(error);

        return;
    }

    tabela.innerHTML = "";

    data.forEach(item => {

        tabela.innerHTML += `
        <tr>

            <td>${item.nome}</td>

            <td>${item.quantidade}</td>

            <td>${item.categoria}</td>

            <td>
                <span class="status">
                    ${item.status}
                </span>
            </td>

            <td class="acoes">

                <button
                    class="btn-acao"
                    onclick="editarItem(${item.id})"
                >
                    ✏️
                </button>

                <button
                    class="btn-acao"
                    onclick="excluirItem(${item.id})"
                >
                    🗑️
                </button>

            </td>

        </tr>
        `;
    });

}

carregarItens();

// =========================
// DELETE
// =========================

async function excluirItem(id) {

    const confirmar =
        confirm(
            "Deseja excluir este item?"
        );

    if (!confirmar) return;

    const { data, error } =
    await supabaseClient
        .from("item")
        .delete()
        .eq("id", id)
        .select();

console.log("ID:", id);
console.log("DATA:", data);
console.log("ERROR:", error);

    if (error) {

        console.error(error);

        alert(
            "Erro ao excluir item!"
        );

        return;
    }

    alert(
        "Item excluído com sucesso!"
    );

    carregarItens();

}

// =========================
// UPDATE
// =========================

function editarItem(id) {

    localStorage.setItem(
        "itemEditar",
        id
    );

    window.location.href =
        "cadastro.html";

}

const pesquisa = document.getElementById("pesquisa");

if (pesquisa) {

    pesquisa.addEventListener("keyup", () => {

        const texto =
            pesquisa.value.toLowerCase();

        const linhas =
            document.querySelectorAll(
                "#tabelaItens tr"
            );

        linhas.forEach(linha => {

            const conteudo =
                linha.textContent.toLowerCase();

            linha.style.display =
                conteudo.includes(texto)
                    ? ""
                    : "none";
        });

    });

}