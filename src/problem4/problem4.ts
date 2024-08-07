function sum_to_n_a(n: number): number {
    let res = 0;
    for (let i = 0; i < n; i++){
      res += i + 1;
    }
    return res;
}

function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}

function sum_to_n_c(n: number): number {
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n_c(n - 1);
}

