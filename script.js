// Configure o cliente do Supabase
const SUPABASE_URL = 'https://seu-supabase-url.supabase.co';
const SUPABASE_KEY = 'sua-chave-de-api';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Manipulação do formulário
const form = document.getElementById('production-form');
const quantidadeEtiquetaInput = document.getElementById('quantidade-etiqueta');
const quantidadeMaquinaInput = document.getElementById('quantidade-maquina');
const percentualAcertoInput = document.getElementById('percentual-acerto');

// Atualiza o percentual de acerto
function updatePercentualAcerto() {
    const quantidadeEtiqueta = parseInt(quantidadeEtiquetaInput.value) || 0;
    const quantidadeMaquina = parseInt(quantidadeMaquinaInput.value) || 0;

    if (quantidadeMaquina > 0) {
        const percentual = ((quantidadeEtiqueta / quantidadeMaquina) * 100).toFixed(2);
        percentualAcertoInput.value = `${percentual}%`;
    } else {
        percentualAcertoInput.value = '';
    }
}

quantidadeEtiquetaInput.addEventListener('input', updatePercentualAcerto);
quantidadeMaquinaInput.addEventListener('input', updatePercentualAcerto);

// Salva os dados no Supabase
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const op = document.getElementById('op').value;
    const carimbadeira = document.getElementById('carimbadeira').value;
    const quantidadeEtiqueta = parseInt(quantidadeEtiquetaInput.value) || 0;
    const quantidadeMaquina = parseInt(quantidadeMaquinaInput.value) || 0;
    const percentualAcerto = percentualAcertoInput.value;
    const data = new Date().toISOString();

    try {
        const { data: insertData, error } = await supabase
            .from('producao')
            .insert([{ op, carimbadeira, quantidadeEtiqueta, quantidadeMaquina, percentualAcerto, data }]);

        if (error) {
            throw error;
        }

        alert('Dados salvos com sucesso!');
        form.reset();
        percentualAcertoInput.value = '';
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        alert('Ocorreu um erro ao salvar os dados. Tente novamente.');
    }
});
