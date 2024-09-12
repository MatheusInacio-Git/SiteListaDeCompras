// Variáveis globais para armazenar a lista de compras e o índice do item selecionado
let listaDeCompras = []; // Declaração e inicialização de um array vazio para armazenar itens de compras
let indiceLista = -1; // Declaração e inicialização do índice do item selecionado, -1 indica nenhum item selecionado

// Função para limpar os campos de entrada
function limpaCampos(){
    document.getElementById('item').value=''; // Limpa o campo de entrada 'item'
    document.getElementById('valor').value=''; // Limpa o campo de entrada 'valor'
}

// Função para adicionar ou atualizar um item na lista
function salvar(){
    let item = document.getElementById('item').value; // Obtém o valor do campo de entrad 'iatem'
    let valor = document.getElementById('valor').value; // Obtém o valor do campo de entrada 'valor'

    // Se já houver um índice selecionado, atualiza o item na lista
    if (indiceLista >= 0){ // Verifica se um item está selecionado (índice maior ou igual a 0)
        let obj = listaDeCompras[indiceLista]; // Obtém o objeto da lista com base no índice selecionado
        obj.item = item; // Atualiza o valor do item
        obj.valor = valor; // Atualiza o valor do preço
    } else {
        // Caso contrário, adiciona um novo item à lista
        listaDeCompras.push({'item': item, 'valor': valor}); // Adiciona um objeto com item e preço à lista de compras
    }
    
    limpaCampos(); // Limpa os campos de entrada
    atualizarTabela(); // Atualiza a exibição da tabela
    indiceLista = -1; // Reinicia o índice selecionado
}

// Função para preencher os campos de entrada com os dados do item selecionado para edição
function editarItem(indice) {
    indiceLista = indice; // Armazena o índice do item selecionado
    let obj = listaDeCompras[indice]; // Obtém o objeto da lista com base no índice selecionado
    document.getElementById('item').value = obj.item; // Preenche o campo 'item' com o valor do objeto
    document.getElementById('valor').value = obj.valor; // Preenche o campo 'valor' com o preço do objeto
}

// Função para remover um item da lista
function excluirItem(indice) {
    if (confirm(`Tem Certeza que Deseja Remover o Item ${listaDeCompras[indice].item} ?`)){
        // Remove o item da lista com base no índice especificado
        listaDeCompras.splice(indice, 1);
        atualizarTabela(); // Atualiza a exibição da tabela após a remoção do item
    }
}

// Função para mostrar o número total de elementos na lista de compras
function mostrarNumeroTotalDeElementos() {
    var totalElementos = listaDeCompras.length; // Obtém o comprimento da lista de compras
    console.log("O número total de elementos na lista é: " + totalElementos); // Exibe o número total de elementos na lista
}

// Função para atualizar a exibição da tabela com os dados da lista de compras
function atualizarTabela(){
    let tableBody = document.getElementById('table-body'); // Obtém o elemento tbody da tabela
    tableBody.innerHTML = ''; // Limpa o conteúdo atual do corpo da tabela

    // Preenche a tabela com os dados da lista de compras
    listaDeCompras.forEach((i, indice) => {
        let tr = document.createElement('tr'); // Cria um novo elemento de linha <tr> na tabela
        tr.innerHTML = `
            <td>${i.item}</td> // Adiciona o item à célula da primeira coluna
            <td>R$ ${i.valor}</td> // Adiciona o preço à célula da segunda coluna
            <td> // Célula da terceira coluna contendo botões para edição e exclusão
                <button type="button" onclick="editarItem(${indice})" class="material-symbols-outlined btn-icone">edit</button> // Botão de edição
                <button type="button" onclick="excluirItem(${indice})" class="material-symbols-outlined btn-icone">delete</button> // Botão de exclusão
            </td>
        `;
        tableBody.append(tr); // Adiciona a linha à tabela
    });
}
