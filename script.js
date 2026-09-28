const SUPABASE_URL =
"https://irajgguctyxzgpqqhlgr.supabase.co";

const SUPABASE_KEY =
"sb_publishable_0FZCm7P_vDBp6KH6XhR6fg_q6-4fFUx";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// =========================
// VERIFICAR LOGIN
// =========================

(async () => {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    const paginaAtual =
        window.location.pathname;

    const estaNoLogin =
        paginaAtual.includes("login.html");

    if (!session && !estaNoLogin) {

        window.location.href =
            "login.html";

    }

})();

// =========================
// CREATE
// =========================

const form = document.getElementById("formItem");

if (form) {

    const idEditar =
        localStorage.getItem("itemEditar");

    // Carregar dados para edição
    if (idEditar) {

        carregarItemParaEditar(idEditar);

    }

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

        let error;

        if (idEditar) {

            ({ error } = await supabaseClient
                .from("item")
                .update({
                    nome,
                    quantidade,
                    categoria,
                    status
                })
                .eq("id", Number(idEditar)));

        } else {

            ({ error } = await supabaseClient
                .from("item")
                .insert([
                    {
                        nome,
                        quantidade,
                        categoria,
                        status
                    }
                ]));

        }

        if (error) {

            console.error(error);

            alert("Erro ao salvar item!");

            return;
        }

        localStorage.removeItem(
            "itemEditar"
        );

        alert("Item salvo com sucesso!");

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

    alert("ID recebido: " + id);

    const confirmar =
        confirm("Deseja excluir este item?");

    if (!confirmar) return;

    const { data, error } =
        await supabaseClient
            .from("item")
            .delete()
            .eq("id", Number(id))
            .select();

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

async function carregarItemParaEditar(id) {

    const { data, error } =
        await supabaseClient
            .from("item")
            .select("*")
            .eq("id", Number(id))
            .single();

    if (error) {

        console.error(error);
        return;

    }

    document.getElementById("nome").value =
        data.nome;

    document.getElementById("quantidade").value =
        data.quantidade;

    document.getElementById("categoria").value =
        data.categoria;

    document.getElementById("status").value =
        data.status;

}

// =========================
// PESQUISA
// =========================

const pesquisa =
    document.getElementById(
        "pesquisa"
    );

if (pesquisa) {

    pesquisa.addEventListener(
        "keyup",
        () => {

            const texto =
                pesquisa.value
                    .toLowerCase();

            const linhas =
                document.querySelectorAll(
                    "#tabelaItens tr"
                );

            linhas.forEach(
                linha => {

                    const conteudo =
                        linha.textContent
                            .toLowerCase();

                    linha.style.display =
                        conteudo.includes(texto)
                            ? ""
                            : "none";

                }
            );

        }
    );

}

// =========================
// LOGOUT
// =========================

async function logout() {

    await supabaseClient.auth.signOut();

    window.location.href =
        "login.html";

}