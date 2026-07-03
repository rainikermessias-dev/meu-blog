// Contadores iniciais
let likes = 0;
let dislikes = 0;

// Estados para verificar se o usuário já clicou
let usuarioCurtiu = false;
let usuarioDescurtiu = false;

// Seleção de elementos do DOM (Reações)
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const likeCount = document.getElementById('likeCount');
const dislikeCount = document.getElementById('dislikeCount');

// Seleção de elementos do DOM (Comentários)
const commentForm = document.getElementById('commentForm');
const commentName = document.getElementById('commentName');
const commentText = document.getElementById('commentText');
const commentsList = document.getElementById('commentsList');

likeBtn.addEventListener('click', () => {
    if (!usuarioCurtiu) {
        likes++;
        usuarioCurtiu = true;
        likeBtn.classList.add('active');

        // Se o usuário já tinha descurtido antes, removemos o dislike
        if (usuarioDescurtiu) {
            dislikes--;
            usuarioDescurtiu = false;
            dislikeBtn.classList.remove('active');
        }
    } else {
        // Se clicar de novo, retira o curtir
        likes--;
        usuarioCurtiu = false;
        likeBtn.classList.remove('active');
    }
    atualizarContadores();
});

// Lógica do Botão Descurtir
dislikeBtn.addEventListener('click', () => {
    if (!usuarioDescurtiu) {
        dislikes++;
        usuarioDescurtiu = true;
        dislikeBtn.classList.add('active');

        // Se o usuário já tinha curtido antes, removemos o like
        if (usuarioCurtiu) {
            likes--;
            usuarioCurtiu = false;
            likeBtn.classList.remove('active');
        }
    } else {
        // Se clicar de novo, retira o descurtir
        dislikes--;
        usuarioDescurtiu = false;
        dislikeBtn.classList.remove('active');
    }
    atualizarContadores();
});

function atualizarContadores() {
    likeCount.textContent = likes;
    dislikeCount.textContent = dislikes;
}

// Lógica de Envio de Comentários
commentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede a página de recarregar ao enviar o formulário

    // Captura os valores dos inputs
    const nome = commentName.value.trim();
    const texto = commentText.value.trim();

    if (nome && texto) {
        // Cria a estrutura HTML do novo comentário
        const novoComentario = document.createElement('div');
        novoComentario.classList.add('comment-item');

        novoComentario.innerHTML = `
            <strong>${nome}</strong>
            <p>${texto}</p>
        `;

        // Adiciona o comentário no topo da lista de comentários
        commentsList.insertBefore(novoComentario, commentsList.firstChild);

        // Limpa o formulário após o envio
        commentForm.reset();
    }
});
