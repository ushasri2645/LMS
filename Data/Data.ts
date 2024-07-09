const Data = {
    authorsData : [
        { name: 'Rabindranath Tagore', birth_year: 1861, nationality: 'Indian' },
        { name: 'R.K. Narayan', birth_year: 1906, nationality: 'Indian' },
        { name: 'Arundhati Roy', birth_year: 1961, nationality: 'Indian' },
        { name: 'Chetan Bhagat', birth_year: 1974, nationality: 'Indian' }
    ],
    booksData : [
        { title: 'Gitanjali', authorId: 1,no_of_copies:12, genre: 'Poetry', isbn: '9789388118297', publication_year: 1910 },
        { title: 'Malgudi Days', authorId: 2,no_of_copies:14, genre: 'Fiction', isbn: '9788185986174', publication_year: 1943 },
        { title: 'The God of Small Things', authorId: 3 ,no_of_copies:15, genre: 'Fiction', isbn: '9780679457312', publication_year: 1997 },
        { title: 'Five Point Someone', authorId: 4,no_of_copies:13, genre: 'Fiction', isbn: '9788129104595', publication_year: 2004 }
    ],
    loansData : [
        { book_id: 1, member_id: 1, loan_date: new Date(), due_date: new Date(new Date().setDate(new Date().getDate() + 14)) },
        { book_id: 2, member_id: 2, loan_date: new Date(), due_date: new Date(new Date().setDate(new Date().getDate() + 14)) }
      ],
    reservationsData : [
        { book_id: 3, member_id: 2, reservation_date: new Date() },
        { book_id: 4, member_id: 1, reservation_date: new Date() }
    ],
    membersData : [
        { name: 'John Doe', address: '123 Main St', phone_number: '1234567890', email: 'john@example.com' },
        { name: 'Jane Smith', address: '456 Elm St', phone_number: '0987654321', email: 'jane@example.com' }
    ]
}

export {Data}