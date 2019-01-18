Using [https://www.json-generator.com](https://www.json-generator.com)

```
[
  '{{repeat(99)}}',
  {
     name: '{{company()}}',
     address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
     phone: '{{phone()}}',
     fax: '{{phone()}}',
     mainUrl: 'http://www.{{lorem(1, "words")}}.com',
     employmentUrl: 'http://www.{{lorem(1, "words")}}.com',
     description: '{{lorem(1, "paragraphs")}}',
     technicalPub: '{{random("Yes", "No", "Needed")}}',
     training: '{{random("Yes", "No", "Needed")}}',
     marketing: '{{random("Yes", "No", "Needed")}}',
     managers:[
        '{{repeat(1, 3)}}',
        {
           name: '{{firstName()}} {{surname()}}',
           title: 'Manager of {{lorem(2, "words")}}',
           contactInfo: '{{email()}}',
           reponsibilities: 'Responsibilities include {{lorem(2, "words")}} and {{lorem(2, "words")}}'
        }
     ],
     tools:[
        '{{repeat(1, 5)}}',
        '{{lorem(1, "words")}}'
     ],
     global: '{{bool()}}',
     credentials:[
        '{{repeat(1, 3)}}',
        '{{lorem(2, "words")}} Certificate'
     ]
  }
]
```
