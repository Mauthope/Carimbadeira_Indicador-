// Configuração do Supabase
const supabaseUrl = 'https://vfivrbyobztxbjhvfatb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmaXZyYnlvYnp0eGJqaHZmYXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NzA5ODAsImV4cCI6MjA1MzE0Njk4MH0.mMgj-aTDwEMKTIKS9DwgPrTEA8IaDfSKfSiTkegXcfk';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);


// Função para carregar os dados da tabela
async function carregarDados() {
  const { data, error } = await supabase
    .from('Indicador_Carimbadeira')
    .select('*');

  if (error) {
    console.error('Erro ao carregar dados:', error.message);
    return;
  }

  const tabela = document.querySelector('#dados-table tbody');
  tabela.innerHTML = '';

  data.forEach((item) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${item.id}</td>
      <td>${item.op}</td>
      <td>${item.carimbadeira}</td>
      <td>${item.quantidade_etiqueta}</td>
      <td>${item.quantidade_maquina}</td>
      <td>${item.percentual_erro}</td>
      <td>${new Date(item.created_at).toLocaleString()}</td>
    `;
    tabela.appendChild(linha);
  });
}

// Função para salvar os dados do formulário
async function salvarDados(event) {
  event.preventDefault();

  const op = document.querySelector('#op').value;
  const carimbadeira = document.querySelector('#carimbadeira').value;
  const quantidade_etiqueta = parseInt(document.querySelector('#quantidade_etiqueta').value);
  const quantidade_maquina = parseInt(document.querySelector('#quantidade_maquina').value);
  const percentual_erro = parseFloat(document.querySelector('#percentual_erro').value);

  const { error } = await supabase.from('Indicador_Carimbadeira').insert([
    {
      op,
      carimbadeira,
      quantidade_etiqueta,
      quantidade_maquina,
      percentual_erro,
    },
  ]);

  if (error) {
    alert('Erro ao salvar dados: ' + error.message);
    return;
  }

  alert('Dados salvos com sucesso!');
  document.querySelector('#form').reset();
  carregarDados();
}

// Event listener para o formulário
document.querySelector('#form').addEventListener('submit', salvarDados);

// Carregar os dados ao carregar a página
carregarDados();
