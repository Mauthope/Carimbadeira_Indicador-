// Configure o cliente do Supabase
const SUPABASE_URL = 'https://vfivrbyobztxbjhvfatb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmaXZyYnlvYnp0eGJqaHZmYXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NzA5ODAsImV4cCI6MjA1MzE0Njk4MH0.mMgj-aTDwEMKTIKS9DwgPrTEA8IaDfSKfSiTkegXcfk';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Manipulação do formulário
const form = document.getElementById('production-form');
const quantidadeEtiquetaInput = document.getElementById('quantidade-etiqueta');
const quantidadeMaquinaInput = document.getElementById('quantidade-maquina');

// Salva os dados no Supabase
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const op = document.getElementById('op').value;
    const carimbadeira = document.getElementById('carimbadeira').value;
    const quantidadeEtiqueta = parseInt(quantidadeEtiquetaInput.value) || 0;
    const quantidadeMaquina = parseInt(quantidadeMaquinaInput.value) || 0;
    const percentualAcerto = quantidadeMaquina > 0 
        ? ((quantidadeEtiqueta / quantidadeMaquina) * 100).toFixed(2) + '%' 
        : '';
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
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        alert('Ocorreu um erro ao salvar os dados. Tente novamente.');
    }
});
